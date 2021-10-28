// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;

exports.registerWithEureka = () => {
// example configuration
    const client = new Eureka({
        // application instance information
        instance: {
            app: 'user-service',
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            port: 9000,
            vipAddress: 'MS-user',
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            // eureka server host / port
            hostName: 'erp-eureka.herokuapp.com',
            host: 'https://erp-eureka.herokuapp.com/eureka/',
            port: 80,
        },
    });

    function exitHandler(options, exitCode) {
        if (options.cleanup) {
        }
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }

    client.on('deregistered', () => {
        process.exit();
        console.log('after deregistered');
    })

    client.on('started', () => {
        console.log("eureka host  " + "erp-eureka.herokuapp.com");
    })

    process.on('SIGINT', exitHandler.bind(null, {exit: true}));
};
