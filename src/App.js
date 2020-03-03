import React, { Component } from 'react';
import { Button } from 'antd';
import http from './config/api';
import('@/index.css')

class App extends Component {
    async testUrl(){
      try{
        console.log(http);
        const {data} = http.shareGet({
          uin:204798563,
          languageId:1
        });
      } catch (e) {
        console.log(e)
      }
    }

    render() {
      return (
        <div className="App">
          <Button type="primary" onClick={()=>{
            this.testUrl()
          }}>Button</Button>
        </div>
      );
    }
  }
  
  export default App; 