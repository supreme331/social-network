const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': 'Chocolate',
                            '@menu-bg': 'Ivory',
                            '@layout-header-background': 'LightGoldenrodYellow',
                            '@menu-inline-submenu-bg': 'Ivory',
                            '@menu-item-active-bg': 'Khaki',
                            '@menu-highlight-color': 'Chocolate',
                            '@layout-sider-background': 'Ivory',
                            '@layout-body-background': 'Ivory'

                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};