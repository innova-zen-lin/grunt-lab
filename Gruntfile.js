module.exports=function(grunt){
    //scripts for using connect-proxy
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    //proxy setting
    var to81Proxy = {
        context: ['/news'],
        host: 'news.google.com',
        port: 80
    };

    //configuration
    grunt.initConfig({
        //pass in options to plugins, references to files etc
        pkg: grunt.file.readJSON('package.json'),
        
        /* ===== concat ===== */
        concat:{
            js:{
                src:['src/js/*.js'],
                dest: 'build/scripts.js'
            },
            css:{
                src:['src/css/*.css'],
                dest: 'build/style.css'
            }
        },
        
        /* ===== uglify ===== */
        uglify:{
            scripts: {
                options: {
                    compress: true,
                    // mangle: false,
                    /**/
                    mangle: {
                        toplevel: true
                    },
                    
                    sourceMap: true,
                    sourceMpName: 'com.innovasolutions.example.script'
                },
                files: [{
                    src: 'src/js/*.js',
                    dest: 'build/scripts.min.js'
                }]
            }
        },

        /* ===== clean ===== */
        clean:{
            options: {
                force: true
            },
            build: ['build']
        },

        /* ===== connect ===== */
        connect:{
            /**/
            options:{
                protocal: 'https',
                port:8080,
                hostname:'localhost',
                base: ['src/'],
                keepalive: true,
                middleware: function (connect, options, middlewares)
                {
                    middlewares.unshift(proxySnippet);
                    return middlewares;
                }
            },
            /* */
            // site_1:{
            //     options:{
            //         protocal: 'http',
            //         port:8080,
            //         hostname:'localhost',
            //         base: ['src/'],
            //         keepalive: true //if this filed is 'true', would block next profile
            //     }
            // },
            'site_1':{
                proxies:[to81Proxy]
            },
            site_2: {
                options: {
                    base: [''],
                    host: 'localhost',
                    port: '8081',
                    useAvailablePort: false,
                    keepalive: true
                }
            },
            watch:{
                
            }
        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    //regist tasks
    grunt.registerTask('speak', function(){
        console.log("I'm Speaking")
    });

    grunt.registerTask('yell', function(){
        console.log("I'm Yelling")
    });

    grunt.registerTask('cry', function(){
        console.log("I'm crying")
    });

    grunt.registerTask('concatAll',['concat']);
    grunt.registerTask('concatJS',['concat:js']);

    grunt.registerTask('default', ['speak','yell'])

    grunt.registerTask('all', ['speak','yell','cry']);

    grunt.registerTask('connect-all',['connect:site_1','connect:site_2']);
    grunt.registerTask('connect-one-proxy',['configureProxies:site_1','connect:site_1']);
    grunt.registerTask('connect-two',['connect:site_2']);
    grunt.registerTask('build',['clean', 'concatAll']);
};
