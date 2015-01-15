/*
 * grunt-jetty-runner
 * https://github.com/zalari/grunt-jetty-runner
 *
 * Copyright (c) 2015 Christian Ulbrich (Zalari UG haftungsbeschränkt)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    jettyRunner: {

      options: {
        port: 9090
      },

      production: {
        options: {
          port:8080,
          useInternalJetty:false
        },
        context: [
          {src:'/Users/chris/Documents/Projekt-Repos/Pentasys/otdb/prototyp/server/web/web-impl/target/otdb-rs.war', path:'/otdb-rs'},
          {src:'/Users/chris/Documents/Projekt-Repos/Pentasys/otdb/prototyp/angular-app/target/otdb-app.war', path:'/angular-app'}
        ]
      },

      dev: {

        context: [
          {src:['/Users/chris/Documents/Projekt-Repos/Pentasys/otdb/prototyp/server/web/web-impl/target/otdb-rs.war'], path:'/otdb-rs'},
          {src:['/Users/chris/Documents/Projekt-Repos/Pentasys/otdb/prototyp/angular-app/target/otdb-app.war'], path:'/angular-app'}
        ]
      }



    },



    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jettyRunner', 'nodeunit']);

  //test it
  grunt.registerTask('testJettyAll',['jettyRunner']);
  grunt.registerTask('testJettySingle',['jettyRunner:production']);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
