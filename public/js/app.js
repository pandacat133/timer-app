import React from 'react';
import helpers from './helpers';
import ServerCommunication from './serverCommunication';

const Client = new ServerCommunication();

class TimersDashboard extends React.Component {
    state = {
        timers: []
    };

    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };

    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };

    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };

    static byId(searched_id) {
        return ({id}) => id === searched_id;
    }

    updateTimerById(id, attrs) {
        const timers = this.state.timers.slice();
        const timerPos = timers.findIndex(TimersDashboard.byId(id));
        if (~timerPos) {
            timers[timerPos] = Object.assign({}, timers[timerPos], attrs);
            this.setState({
                timers
            });
        }
    }

    updateTimer(attrs) {
        this.updateTimerById(attrs.id, {
            title: attrs.title,
            project: attrs.project
        });
        Client.updateTimer(attrs);
    }

    startTimer(timerId) {
        this.updateTimerById(timerId, {
            runningSince: Date.now()
        });
        Client.startTimer({
            id: timerId
        });
    }

    stopTimer(timerId) {
        const timer = this.state.timers.find(TimersDashboard.byId(timerId));
        if (timer) {
            this.updateTimerById(timerId, {
                elapsed: timer.elapsed + Date.now() - timer.runningSince,
                runningSince: null
            });
            Client.stopTimer({
                id: timerId
            });
        }
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    createTimer(timer) {
        const t = helpers.newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t)
        });
        Client.createTimer(timer)
    }

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    deleteTimer(timerId) {
        this.setState({
            timers: this.state.timers.filter(({id}) => id !== timerId)
        });
        Client.deleteTimer( timerId );
    }

    loadTimersFromServer = async() => {
        try {
            const timers = await Client.getTimers();
            this.setState({
                timers
            });
        } catch (err) {
            console.error(err);
        }
    };

    componentDidMount() {
        this.loadTimersFromServer();

        this.ajaxInterval = setInterval(this.loadTimersFromServer, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.ajaxInterval);
    }

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                        timers={this.state.timers}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                        isOpen={true}/>
                </div>
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false
    };

    handleFormOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({ isOpen: false });
    };

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button
                        className='ui basic button icon'
                        onClick={this.handleFormOpen}
                    >
                        <i className='plus icon'></i>
                    </button>
                </div> );
        }
    }
}

class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map((timer) => {
            return (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                /> );
        });
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}

class EditableTimer extends React.Component {
    state = {
        editFormOpen: false
    };

    handleEditClick = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    };

    closeForm = () => {
        this.setState({ editFormOpen: false });
    };

    openForm = () => {
        this.setState({ editFormOpen: true });
    };

    render() {
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return ( <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            );
        }
    }
}

class Timer extends React.Component {
    state = {
        buttons : false
    };

    componentDidMount() {
        this.forceUpdateInterval = setInterval( () => this.forceUpdate(), 50 );
    }

    componentWillUnmount() {
        clearInterval( this.forceUpdateInterval );
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    };

    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    };

    showButtons = () => {
        this.setState({
            buttons : true
        });
    };

    hideButtons = () => {
        this.setState({
            buttons : false
        });
    };

    render() {
        const elapsedString = helpers.renderElapsedString( this.props.elapsed, this.props.runningSince );
        let buttons;
        if ( this.state.buttons ) {
            buttons = (
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            );
        }
        return (
            <div className='ui centered card' onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
                <div className='content'>
                    <div className='header'> {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project} </div>
                    <div className='center aligned description'>
                        <h2>
                            {elapsedString}
                        </h2></div>
                    <div className='extra content'>
                        <span
                            className='right floated edit icon'
                            onClick={this.props.onEditClick}
                        >
                            <i className='edit icon'></i>
                        </span>
                        <span
                            className='right floated trash icon'
                            onClick={this.handleTrashClick}
                        >
                            <i className='trash icon'></i>
                        </span>
                    </div>
                </div>
                {buttons}
            </div>
        );
    }
}

class TimerActionButton extends React.Component{
    render() {
        if (this.props.timerIsRunning) {
            return (
                <div
                    className='ui bottom attached red basic button'
                    onClick={this.props.onStopClick}
                >
                    Stop
                </div>
            );
        } else {
            return (
                <div
                    className='ui bottom attached green basic button'
                    onClick={this.props.onStartClick}
                >
                    Start
                </div>
            );
        }
    }

}

class TimerForm extends React.Component {
    state = {
        titleError: false,
        projectError: false
    };

    handleSubmit = () => {
        const titleError = !this.refs.title.value.trim().length;
        const projectError = !this.refs.project.value.trim().length;
        this.setState({
            titleError,
            projectError
        });
        if (!titleError && !projectError) {
            this.props.onFormSubmit({
                id: this.props.id,
                title: this.refs.title.value,
                project: this.refs.project.value
            });
        }
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        const titleClass = this.state.titleError ? 'field error' : 'field';
        const projectClass = this.state.projectError ? 'field error' : 'field';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className={titleClass}>
                            <label>Title</label>
                            <input type='text' ref="title" defaultValue={this.props.title}/></div>
                        <div className={projectClass}>
                            <label>Project</label>
                            <input type='text' ref="project" defaultValue={this.props.project}/></div>
                        <div className='ui two bottom attached buttons'>
                            <button
                                className='ui basic blue button'
                                onClick={this.handleSubmit}
                            >
                                {submitText}
                            </button>
                            <button
                                className='ui basic red button'
                                onClick={this.props.onFormClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div> );
    }
}

ReactDOM.render(
    <TimersDashboard />,
    document.getElementById('content')
);
