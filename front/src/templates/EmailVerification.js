import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { AuthUrls } from '../operations/auth/urls';


class EmailVerify extends Component {
  constructor(props){
    super(props);
    this.state = {
      verified: 0
    }
  }

  async componentDidMount(){
    const key = this.props.match.params.key
    console.log(key)

    if (key){
      const activateUserUrl = AuthUrls.USER_ACTIVATION;
      const data = {'key':key}
      await axios.post(activateUserUrl,data)
        .then(response => {
          this.setState({
            verified: 1
          })
        })
        .catch(error =>
          this.setState({
            verified: 2
          }))
    } else {
      this.setState({
        verified: 2
      })
    }
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="custom-alert">

                    {this.state.verified === 1 && (
                      <div className="alert alert-success" role="alert">
                        <p>登録が完了しました。<Link to="/login">ログイン</Link>してください。</p>
                      </div>
                    )}
                    {this.state.verified === 2 && (
                      <div className="alert alert-danger" role="alert">
                        <p>登録がすでに完了しているか、リンクの期限が切れている可能性があります。</p>
                      </div>
                    )}

              </div>

            </div>
          </div>
        </div>
    );
  }
}


export default EmailVerify