import React, { Component } from 'react';
//import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

const MyPage = () => (
  <Fabric>
    <DefaultButton>
      I am a button.
    </DefaultButton>
  </Fabric>
);

class App extends Component {
  render(){
    return(<MyPage />);
  }
}

export default App;
