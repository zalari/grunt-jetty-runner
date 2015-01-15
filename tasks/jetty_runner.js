/*
 * grunt-jetty-runner
 * https://github.com/zalari/grunt-jetty-runner
 *
 * Copyright (c) 2015 Christian Ulbrich (Zalari UG haftungsbeschränkt)
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    child_process = require('child_process');

var spawn = child_process.spawn;

var cpCache = [];

module.exports = function(grunt) {


  grunt.registerMultiTask('jettyRunner', 'Grunt plugin to run jetty-runner from grunt; bundles current jetty-runner as well.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      useInternalJetty : true,
      delayForSuccess : 10
    });

    //merge options with task specific options
    options = _.merge(options,this.data.options);

    /*console.log(this);
    console.log(options);
*/
    var commandStr='';
    var args = [];

    if (options.useInternalJetty)
    {
      //commandStr='java -jar jetty-runner.jar';
      commandStr='java';
      args.push('-jar');
      args.push('jetty-runner.jar');

    } else {
      commandStr='jetty-runner';
    }

    //iterate over all context entries
    //TODO: fail on emtpy context
    _.forEach(this.data.context,function(contextObj){
      //path option
      if (contextObj.path) {
        //commandStr+=' --path '+contextObj.path;
        args.push('--path');
        args.push(contextObj.path);
      }
      //contextPath
      //commandStr+=' '+contextObj.src;
      args.push(contextObj.src);
    });

    var done = this.async();

    grunt.log.writeln('spawning jetty with:'+commandStr);

    var jettyProcess = spawn(commandStr,args);

    jettyProcess.on('error',function(error){
      console.log(error);
      done(error);
    });

    cpCache.push(jettyProcess);

    /*jettyProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });*/

    setTimeout(function(){done()},options.delayForSuccess*1000);

    /*exec(commandStr,function(error){
      if (error!==null)
      {
        done(error);
      }
      else {
        done();
      }
    });*/





  });

};

process.on('exit', function () {
  console.log('exit...');
  cpCache.forEach(function (el) {
    console.log('Killing a cp...');
    el.kill();
  });
});

