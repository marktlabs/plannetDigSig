import React, { Component } from 'react';
import './Scheduler.css';
import SchedulerContent from '../ScheduleContent/ScheduleContent'
import { Collapsible, CollapsibleItem } from 'react-materialize';

const Days = [
    { name: "Monday", key: 0 },
    { name: "Tuesday", key: 1 },
    { name: "Wednesday", key: 2 },
    { name: "Thursday", key: 3 },
    { name: "Friday", key: 4 },
    { name: "Saturday", key: 5 },
    { name: "Sunday", key: 6 }
]

class Scheduler extends Component {

    render() {
        return (
            <div className="Scheduler" >
                <h5 className="titleHead" > Set a daily schedule for each DMP: </h5>
                <Collapsible>
                    {Days.map(({ name, key }) => (
                        <CollapsibleItem
                            key={key}
                            header={name}
                            icon='toc'>
                            <SchedulerContent dayIndex={key}
                                setNewTrigger={this.props.setNewTrigger}
                                handleSubmit={this.props.submitSchedules}
                                schedulerSection={this.props.schedulerSection}
                                getDayOfWeek={this.props.getDayOfWeek} />
                        </CollapsibleItem>
                    ))}

                </Collapsible>
            </div>
        )
    }
}
export default Scheduler;
