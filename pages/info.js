import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../store'
import _ from 'lodash';
import Layout from '../components/MyLayout'
import StaticPage from '../components/StaticPage';

class Info extends React.Component {
    static getInitialProps(props) {
        const { query: { title }, store, isServer } = props;
        const action = (getProducts(isServer));
        store.dispatch(action);
        return { route: { title }, test:store.getState()  }
    }

    render() {
        let md = _.first(this.props.staticTexts.filter((staticText) => {
            return staticText.path === this.props.route.title;
        }));
        return (
            <Layout>
                <StaticPage content={md.content} />
            </Layout>
        )
    }
}
const mapStateToProps = ({ staticTexts }) => {
    return {
        staticTexts 
    }
}

export default connect(mapStateToProps)(Info)