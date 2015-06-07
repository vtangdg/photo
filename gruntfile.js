module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['routes/*.js', 'models/*.js', './app.js']
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        task: ['jshint'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

}
