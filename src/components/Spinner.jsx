import React from 'react'

import {BarLoader} from 'react-spinners'


const override = {
  display: "block",
  margin: "0 auto 100 auto",
};
const Spinner = ({color = "blue", size = "150"}) => {
  return (
    <div>
      <BarLoader color={color} size={size}  cssOverride={override} aria-label="Load Hudai Cha Solti"/>
    </div>
  )
}

export default Spinner