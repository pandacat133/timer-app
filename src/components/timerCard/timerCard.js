import React, {Component} from 'react';
import './timerCard.css';

class TimerCard extends Component {

    render() {
        return(
            <div className="tCContainer">
                <div className="titleContainer">
                    <div className="title">
                        <h2>Mow the lawn</h2>
                    </div>
                    <div className="subtitle">
                        <h3>House Chores</h3>
                    </div>
                </div>
                <div className="timerDisplay">
                    01:30:56
                </div>
                <div className="actionsContainer">
                    <div className="deleteBtn">
                        <i className="material-icons">
                            delete_outline
                        </i>
                    </div>
                    <div className="editBtn">
                        <i className="material-icons">
                            edit
                        </i>
                    </div>
                </div>
                <div className="startBtn">
                    <button>Start</button>
                </div>
            </div>
        );
    }
}

export default TimerCard