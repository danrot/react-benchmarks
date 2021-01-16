const callbackSuite = new Benchmark.Suite();

callbackSuite
    .add(
        'component-with-separate-button',
        function() {
            ReactDOM.render(React.createElement(Component, null), appContainer);
        },
        {
            setup: function() {
                const appContainer = document.getElementById('app');

                class Button extends React.Component {
                    render() {
                        return React.createElement("button", {
                            onClick: this.props.onClick,
                        }, "Test");
                    }
                }

                class Component extends React.Component {
                    handleClick = () => {};

                    render() {
                        return React.createElement(Button, {
                            onClick: this.handleClick
                        }, "Test");
                    }
                }
            }
        }
    )
    .add(
        'component-with-inline-button',
        function() {
            ReactDOM.render(React.createElement(Component, null), appContainer);
        },
        {
            setup: function() {
                const appContainer = document.getElementById('app');

                class Component extends React.Component {
                    handleClick = () => {};

                    render() {
                        return React.createElement("button", {
                            onClick: this.handleClick
                        }, "Test");
                    }
                }
            }
        }
    )
    .add(
        'component-with-inline-button-inline-function',
        function() {
            ReactDOM.render(React.createElement(Component, null), appContainer);
        },
        {
            setup: function() {
                const appContainer = document.getElementById('app');

                class Component extends React.Component {
                    render() {
                        return React.createElement("button", {
                            onClick: () => {},
                        }, "Test");
                    }
                }
            }
        }
    )
    .add(
        'hook-with-inline-button-callback-function',
        function() {
            ReactDOM.render(React.createElement(Component, null), appContainer);
        },
        {
            setup: function() {
                const appContainer = document.getElementById('app');

                function Component() {
                    return React.createElement("button", {
                        onClick: React.useCallback(() => {}, [])
                    }, "Test");
                }
            }
        }
    )
    .add(
        'hook-with-inline-button-inline-function',
        function() {
            ReactDOM.render(React.createElement(Component, null), appContainer);
        },
        {
            setup: function() {
                const appContainer = document.getElementById('app');

                function Component() {
                    return React.createElement("button", {
                        onClick: () => {}
                    }, "Test");
                }
            }
        }
    )
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': true});
