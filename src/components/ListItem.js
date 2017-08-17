import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, View, LayoutAnimation, Platform, UIManager} from 'react-native';
import {CardSection} from './common';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {

    componentWillMount() {
        if (Platform.OS === 'android'){
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const {library, expanded} = this.props;

        if (expanded) {
            return (
                <CardSection>
                    <Text style={{flex: 1}}>{library.description}</Text>
                </CardSection>
            );
        }
    }

    render() {
        const {titleStyle} = styles;
        const {id, title} = this.props.library;

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.selectLibrary(id)
            }}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                            {title}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>

        );
    }


}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },

};

const mapStateToProps = (state, ownProps) => {

    const expanded = state.selectedLibraryId === ownProps.library.id;
    return {
        expanded
    }
};

export default connect(mapStateToProps, actions)(ListItem);