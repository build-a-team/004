import React, { createElement } from 'react'

import SimpleCard from './SimpleCard'
import DraggableCard from './DraggableCard'
import { log } from 'ruucm-util';

const Card = ({ active = false, ...props }) => {
	log('props', props);
  const component = active ? DraggableCard : SimpleCard
  return createElement(component, props)
}

export default Card
