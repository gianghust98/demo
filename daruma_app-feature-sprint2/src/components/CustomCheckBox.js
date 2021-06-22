import React, { Component } from 'react';
import {
  StyleSheet, 
  TouchableOpacity,
  View, 
  Text,
  Image,
} from 'react-native';
import Images from '../../res/img';
import PropTypes from 'prop-types';
import { Theme, Colors } from '../styles';
import { scale, verticalScale } from '../utils/Scaling';

export default class CustomCheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let containerStyle = [styles.defaultContainerStyle, this.props.containerStyle];
    let titleStyle = [styles.defaultTitleStyle, this.props.titleStyle];
    let iconStyle = [styles.defaultIconStyle, this.props.iconStyle];
    let iconWrapper = [styles.iconWrapper]
    let iconSource = this.props.uncheckedIcon ? this.props.uncheckedIcon : Images.ic_check_none
  
    if (this.props.checked) {
      containerStyle.push(styles.defaultCheckedContainerStyle, this.props.checkedContainerStyle);
      titleStyle.push(styles.defaultCheckedTitleStyle,this.props.checkedTitleStyle);
      iconSource = this.props.checkedIcon? this.props.checkedIcon : Images.ic_check_able;
    } 
    if (this.props.full) {
      containerStyle.push({ width: '100%' })
    }
    if (this.props.iconStyle && this.props.iconStyle.width) {
      iconWrapper.push({ width: this.props.iconStyle.width + 5 })
    }

    return (
      <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
        <View style={iconWrapper}>
          <Image source={iconSource} style={iconStyle} />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={titleStyle}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

CustomCheckBox.propTypes = {
  full: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  checkedContainerStyle: PropTypes.object,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  checkedTitleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  checkedIcon: PropTypes.object,
  uncheckedIcon: PropTypes.object,
}

const styles = StyleSheet.create({
  defaultContainerStyle: {
    width: '48%',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.LIGHTGRAY,
  },
  defaultCheckedContainerStyle: {
    borderColor: Colors.LAPALMA
  },
  iconWrapper: {
    width: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIconStyle: {
    width: 30,
    height: 30
  },
  defaultTitleStyle: {
    ...Theme.textDarkGray20Bold
  },
  defaultCheckedTitleStyle: {
    ...Theme.textBlack20Bold,
  }
})
