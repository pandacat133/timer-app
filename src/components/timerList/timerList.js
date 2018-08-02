import React, {Component} from 'react';
import TimerCard from "../timerCard/timerCard";
// import ToggleableTimer from "../toggleableTimer/toggleableTimer";

class TimerList extends Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <TimerCard
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
            />
        ));

        return(
            <div>
                {/*Timer List Here*/}
                {/*<ToggleableTimer />*/}
                <div id='timers'>
                    {timers}
                </div>
            </div>
        );
    }
}

export default TimerList