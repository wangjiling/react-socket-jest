import style from './style.css'

import React, {
    PropTypes,
    Component
} from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/user';
import * as SocketActions from '../../actions/socket';

class Home extends Component {
    componentWillMount(){
        const { actions } = this.props;
        actions.getServerVersion();
        actions.getSocketMessage();
    }

    render() {
        const {actions, user, socket} = this.props;
        return (
            <DocumentTitle title='template'>
                <div className={style.homeContainer}>
                  <h2>jsonrpc test</h2>
                  <p>server version: {user.serverVersion}</p>
                  <h2>ws test</h2>
                  <p>server version: {socket.socketServerVersion}</p>
                </div>
            </DocumentTitle>
        )
    }
}

Home.displayName = 'Home';

function mapStateToProps(state) {
    const props = {
        user: state.user,
        socket: state.socket
    };
    return props;
}

function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(Object.assign({}, UserActions, SocketActions), dispatch) };
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

