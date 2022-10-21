// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FrontEndTree = require("./src/_front_end.json");
const BackEndTree = require("./src/_back_end.json");
const DiscussTree = require("./src/_discuss.json");

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new DirectoryTreePlugin({
            dir: './front-end',
            path: './src/_front_end.json'
        }),
        new DirectoryTreePlugin({
            dir: './back-end',
            path: './src/_back_end.json'
        }),
        new DirectoryTreePlugin({
            dir: './to-be-discussed',
            path: './src/_discuss.json'
        }),
        new HtmlWebpackPlugin({
            list: getLinksList( FrontEndTree ),
            template: path.resolve(__dirname, './src/front.html'),
            filename: 'front.html',
        }),
        new HtmlWebpackPlugin({
            list: getLinksList( BackEndTree ),
            template: path.resolve(__dirname, './src/back.html'),
            filename: 'back.html',
        }),
        new HtmlWebpackPlugin({
            list: getLinksList( DiscussTree ),
            template: path.resolve(__dirname, './src/discuss.html'),
            filename: 'discuss.html',
        }),
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
                use: [
                    'html-loader',
                    'markdown-loader'
                ]
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

function getLinksList( LinksTree ) {
    let linksList = '';
    if( LinksTree ) {
        linksList += '<ul>';
        LinksTree.children.forEach( item => {
            let type = item.type;
            if( type === 'directory' ) {
                let linkPath = item.path;
                let name = item.name;
                linksList += '<li><a target="_blank" href="'+ "./../" + linkPath +'">'+ name +'</a></li>';
            }
        });
        linksList += '</ul>';
    }
    return linksList;
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
