import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const isSmallDevice = width <= 320

function getFontSize(fontSize) {
  return isSmallDevice ? fontSize - 2 : fontSize
}

function getTextStyles(color, fontSize, fontWeight) {
  return {
    color,
    fontSize: getFontSize(fontSize),
    fontWeight,
  }
}

export const Colors = {
  BLACK: '#4A4A4A',
  DIMGRAY: '#676767', // マイページ[ライフログ]
  GRAY: '#838383',
  DARKGRAY: '#ACACAC',
  LIGHTGRAY: '#D6D6D6',
  WHITESMOKE: '#FBFBFB',
  WHITE: '#FFFFFF',
  CREAM: '#FFFBD6',
  PANACHE: '#E9F5E5',
  LAPALMA: '#4C9634',
  NIAGARA: '#2FAE91',
  TOPAZ: '#1db2cf',
  CORNFLOWERBLUE: '#4A90E2',
  DODGERBLUE: '#027aff',
  MANDY: '#D24B5C',
  VENETIANRED: '#D0021B',
  GOLDENYELLOW: '#F6DC02',
}


export const Theme = StyleSheet.create({
  // ============BLACK==============
  textBlack12: getTextStyles(Colors.BLACK, 12),
  textBlack14: getTextStyles(Colors.BLACK, 14),
  textBlack16: getTextStyles(Colors.BLACK, 16),
  textBlack16Light: getTextStyles(Colors.BLACK, 16, '400'),
  textBlack16Bold: getTextStyles(Colors.BLACK, 16, 'bold'),
  textBlack18: getTextStyles(Colors.BLACK, 18),
  textBlack18Light: getTextStyles(Colors.BLACK, 18, '400'),
  textBlack18W5: getTextStyles(Colors.BLACK, 18, '500'),
  textBlack18Bold: getTextStyles(Colors.BLACK, 18, 'bold'),
  textBlack20: getTextStyles(Colors.BLACK, 20),
  textBlack20W5: getTextStyles(Colors.BLACK, 20, '500'),
  textBlack20Bold: getTextStyles(Colors.BLACK, 20, 'bold'),
  textBlack22: getTextStyles(Colors.BLACK, 22),
  textBlack22W5: getTextStyles(Colors.BLACK, 22, '500'),
  textBlack22Bold: getTextStyles(Colors.BLACK, 22, 'bold'),
  // ============GRAY==============
  textGray12Light: getTextStyles(Colors.GRAY, 12, '400'),
  textGray14: getTextStyles(Colors.GRAY, 14),
  textGray16: getTextStyles(Colors.GRAY, 16),
  textGray18: getTextStyles(Colors.GRAY, 18),
  textGray18Bold: getTextStyles(Colors.GRAY, 18, 'bold'),
  textGray20: getTextStyles(Colors.GRAY, 20),
  // ============DARKGRAY==============
  textDarkGray14: getTextStyles(Colors.DARKGRAY, 14),
  textDarkGray16: getTextStyles(Colors.DARKGRAY, 16),
  textDarkGray18: getTextStyles(Colors.DARKGRAY, 18),
  textDarkGray18Bold: getTextStyles(Colors.DARKGRAY, 18, 'bold'),
  textDarkGray20: getTextStyles(Colors.DARKGRAY, 20),
  textDarkGray20Bold: getTextStyles(Colors.DARKGRAY, 20, 'bold'),
  textDarkGray22: getTextStyles(Colors.DARKGRAY, 22),
  textDarkGray22Bold: getTextStyles(Colors.DARKGRAY, 22, 'bold'),
  // ============BLACK==============
  textDimGray20: getTextStyles(Colors.DIMGRAY, 20),
  textDimGray18: getTextStyles(Colors.DIMGRAY, 18),
  textDimGray16: getTextStyles(Colors.DIMGRAY, 16),
  // ============WHITE==============
  textWhite20: getTextStyles(Colors.WHITE, 20),
  textWhite20Bold: getTextStyles(Colors.WHITE, 20, 'bold'),
  // ============LAPALMA==============
  textLapalma16: getTextStyles(Colors.LAPALMA, 16),
  textLapalma16Bold: getTextStyles(Colors.LAPALMA, 16, 'bold'),
  textLapalma18Bold: getTextStyles(Colors.LAPALMA, 18, 'bold'),
  textLapalma20: getTextStyles(Colors.LAPALMA, 20),
  textLapalma20Bold: getTextStyles(Colors.LAPALMA, 20, 'bold'),
  textLapalma22Bold: getTextStyles(Colors.LAPALMA, 22, 'bold'),
  // ============MANDY==============
  textMandy20: getTextStyles(Colors.MANDY, 20),
  // ============VENETIANRED==============
  textVenetianRed22: getTextStyles(Colors.VENETIANRED, 22),
  // ============DODGERBLUE============
  textDodgerBlue18Bold: getTextStyles(Colors.DODGERBLUE, 18, 'bold'),
})

