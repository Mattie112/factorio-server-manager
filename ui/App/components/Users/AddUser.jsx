import React from 'react';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email)
    }
    
    createUser(e) {
        e.preventDefault();
        console.log(this.refs);
        let user = {
            username: this.refs.username.value,
            // Add handler for listing roles
            role: "admin",
            password: this.refs.password.value,
            email: this.refs.email.value,
        }
        if (user.password !== this.refs.passwordConfirm.value) {
            console.log("passwords do not match");
            return
        }

        if (!this.validateEmail(user.email)) {
            console.log("invalid email address");
            return
        }

        $.ajax({
            type: "POST",
            url: "/api/user/add",
            dataType: "json",
            data: JSON.stringify(user),
            success: (resp) => {
                if (resp.success === true) {
                    alert("User: " + user.username + " added successfully.");
                    this.props.listUsers();
                } else {
                    alert("Error adding user: ", resp.data)
                }
            }
        })
    }

    render() {
        return(
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Manage Users</h3>
                </div>
                
                <div className="box-body">
                    <h4>Add user</h4>

                    <form action="" onSubmit={this.createUser}>
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input ref="username" type="text" className="form-control" id="username" placeholder="Enter username" />
                        </div> 
                        <div className="form-group">
                            <label for="email">Email address</label>
                            <input ref="email" type="text" className="form-control" id="email" placeholder="Enter email" />
                        </div> 
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input ref="password" type="password" className="form-control" id="password" placeholder="Enter password" />
                        </div> 
                        <div className="form-group">
                            <label for="password">Password confirmation</label>
                            <input ref="passwordConfirm" type="password" className="form-control" id="password" placeholder="Enter password again" />
                        </div> 
                    
                        <button className="btn btn-block btn-success" type="submit"><i className="fa fa-plus fa-fw"></i>Add User</button>
                    </form>
                </div>
            </div>
            
        )
    }
}

AddUser.propTypes = {
    listUsers: React.PropTypes.func.isRequired,
}

export default AddUser
