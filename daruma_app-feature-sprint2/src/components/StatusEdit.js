import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import ModalHeader from './ModalHeader';
import CustomCheckBox from './CustomCheckBox';
import { Theme } from '../styles';

const { width, height } = Dimensions.get('window');

export default class StatusEdit extends Component {
  constructor(props) {
    super(props);
  }

  savePress(selectElm){
    if(this.props.savePress)this.props.savePress(this.props.editData.item, selectElm )
  }

  render() {
    if(!this.props.editData) return null
    return (
      <View style={this.props.editData.item.isSmallModal? [styles.modalContainer, { height: 320 }]: styles.modalContainer}>
        <ScrollView
          bounces={false}
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
        <ModalHeader 
          title={this.props.editData.item.name}
          dismissModal={() => this.props.dismissModal()}/>

          <Text style={[Theme.textBlack20, { paddingHorizontal: 15, textAlign: 'center', marginBottom: 15, lineHeight: 22 }]}>{this.props.editData.item.text}</Text>
          <View style={styles.recordFormsWrapper}>
          {((props)=>{
          const selection = props.editData.item.selection
          const select = props.editData.select
          return selection.map(elm=>{
            const selected = select && select.value === elm.value
            return (
              <CustomCheckBox
                key={elm.label}
                full
                checked={selected}
                onPress={()=>this.savePress(elm)} 
                title={elm.label}
                containerStyle={{ marginBottom: 15 }}
              />
            )
            })
          })(this.props)}
          </View>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 410,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
  },
  container: {
    paddingTop: 20,
    borderRadius: 20,
  },
  recordFormsWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center'
  },
});
