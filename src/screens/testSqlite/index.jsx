import { Text, View } from 'react-native';
import React, { Component } from 'react';
import configDb from '../../db/db';
import { Button } from '../../components';
import usersSeed from '../../db/users.seed';



export class TestSqlite extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      db: undefined,
    };
  }
  componentDidMount(){
    configDb.connectToDb().then((res)=>{
      this.setState({db: res});
      // configDb.createTable(res).then(() => {
      //   console.log("success create table user");
      //   usersSeed.userSeed(res)
      // })
    }).catch(err => console.log(err));
  }

  checkTale = () =>{
    if(this.state.db){
      configDb.getTableUser(this.state.db).then((res) =>{
        if(res){
          this.setState({users:res});
        }
      });
    }
  };
  render() {
    const {users} = this.state;
    return (
      <View>
        {users.map((usr, i)=> {
          console.log(usr);
          return <Text key={i}>{usr?.name}</Text>;
        })}

          <Button
          onPress={this.checkTale}
          label="CHECK TABLE"
          style={{marginTop:64, marginVertical: 32}}
          />
      </View>
    );
  }
}

export default TestSqlite;
