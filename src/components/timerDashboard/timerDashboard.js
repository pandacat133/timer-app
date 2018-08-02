import React, {Component} from 'react';
import TimerList from "../timerList/timerList.js";
import TimerForm from "../timerForm/timerForm.js";

class TimerDashboard extends Component {
    state = {
        timers: [
            {
                title: 'Practice squat',
                project: 'Gym Chores',
                id: Math.floor(Math.random() * 1000000),
                elapsed: 5456099,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: Math.floor(Math.random() * 1000000),
                elapsed: 1273998,
                runningSince: null,
            },
        ],
    };

    render() {
        return(
            <div className="container">
                {/*<div className="title">*/}
                    {/*<h1>Timers</h1>*/}
                    {/*<hr/>*/}
                {/*</div>*/}
                {/*<TimerList />*/}
                {/*<div className="addBtn">*/}
                    {/*<button>+</button>*/}
                {/*</div>*/}
                <div className='ui three column centered grid'>
                    <div className='column'>
                        <TimerList
                            timers={this.state.timers}
                        />
                        <TimerForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default TimerDashboard