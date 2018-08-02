import React, {Component} from 'react';
import TimerCard from "../timerCard/timerCard";
import TimerForm from "../timerForm/timerForm";

class ToggleableTimer extends Component {
    render() {
        return(
            <div>
                Toggle Timer Here
                <TimerCard />
                <TimerForm />
            </div>
        );
    }
}

export default ToggleableTimer