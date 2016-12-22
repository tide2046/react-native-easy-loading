'use strict'
import React from 'react';
import { StyleSheet, Dimensions, Text, View, Modal, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;




export class EasyLoading {
    constructor() {
    }
    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }
    static show(text = 'Loading...', timeout = -1, key = 'default') {
        this.map[key] && this.map[key].setState({ "isShow": true, "text": text, "timeout": timeout });
    }
    static dismis(key = 'default') {
        this.map[key] && this.map[key].setState({ "isShow": false });
    }
}

EasyLoading.map = {};



export class Loading extends React.Component {

    static propTypes = {
        color: React.PropTypes.string,
        textStyle: React.PropTypes.any,
        loadingStyle: React.PropTypes.any,
    };

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "Loading..."
        }
        EasyLoading.bind(this, this.props.type || 'default');
    }
    componentWillUnmount() {
        clearTimeout(this.handle);
    }
    render() {
        if (this.state.isShow) {
            clearTimeout(this.handle);
            (this.state.timeout != -1) && (this.handle = setTimeout(() => {
                EasyLoading.dismis(this.props.type || 'default');
            }, this.state.timeout));
            return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isShow}
                    onRequestClose={() => { alert("Modal has been closed.") } }>
                    <View style={[this.props.loadStyle, styles.load_box]}>
                        <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'large'} style={styles.load_progress} />
                        <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                    </View>
                </Modal>
            );
        } else {
            return (<View />)
        }
    }
}


const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#0008',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH / 2 - 50,
        marginTop: SCREEN_HEIGHT / 2 - 50,
        borderRadius: 10
    },
    load_progress: {
        position: 'absolute',
        width: 100,
        height: 90
    },
    load_text: {
        marginTop: 70,
        color: '#FFF',
    }
});