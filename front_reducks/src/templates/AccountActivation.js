import React from "react";
import { reduxForm } from "redux-form";
import {useDispatch} from 'react-redux';

import {activateAccount} from '../reducks/auth/operations'
import {PrimaryButton} from '../components/UIkit';

let AccountActivation = () => {
    const dispatch = useDispatch();

    return (
        <form onSubmit={values => {
            dispatch(activateAccount(values))
            // values.preventDefault()
          }
        } >
            <PrimaryButton label="確認" type="submit" />
        </form>
    )
};

export default AccountActivation = reduxForm({
    form: 'account_activation',
})(AccountActivation)


// import { activateUserAccount } from "../../actions/authActions";
// import { renderError } from "../../utils/renderUtils";

// class AccountActivation extends Component {

//     static propTypes = {
//         ...propTypes
//     };

//     render() {
//         const { handleSubmit, error } = this.props;

//         return (
//             <div className="row justify-content-center">
//                 <form
//                     onSubmit={handleSubmit}
//                 >
//                     <h4 className="text-md-center">Please click the button below to activate your account</h4>
//                     <hr/>

//                     <fieldset className="form-group">
//                         {renderError(error)}
//                         <button action="submit" className="btn btn-primary">Activate</button>
//                     </fieldset>
//                 </form>
//             </div>
//         );
//     }
// }

// export default reduxForm({
//     form: "user_account_activation",
//     onSubmit: activateUserAccount,
// })(AccountActivation);
