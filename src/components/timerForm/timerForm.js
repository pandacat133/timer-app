import React, {Component} from 'react';

class TimerForm extends Component {

    render() {
        return(
            <div className="formContainer">
                <div className="inputsContainer">
                    <div
                        className="titleInput mdc-text-field text-field mdc-text-field--outlined mdc-text-field--upgraded">
                        <input type="text" id="title" className="mdc-text-field__input"/>
                            <label className="mdc-floating-label" htmlFor="title">
                                Title
                            </label>
                    </div>
                    <div
                        className="projectInput mdc-text-field text-field mdc-text-field--outlined mdc-text-field--upgraded">
                        <input type="text" id="project" className="mdc-text-field__input"/>
                            <label className="mdc-floating-label" htmlFor="project">
                                Project
                            </label>
                    </div>
                </div>
                <div className="btnContainer">
                    <div className="createBtn">
                        <button>Create</button>
                    </div>
                    <div className="updateBtn">
                        <button>Update</button>
                    </div>
                    <div className="cancelBtn">
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimerForm