import React from 'react';
import './Scheduler.css';
import SchedulerContent from '../ScheduleContent/ScheduleContent'
import {Collapsible, CollapsibleItem} from 'react-materialize';
  
const scheduler = (props) => {
    return (
        <div className="Scheduler" >
           <h5> Set a daily schedule for each DMP: </h5>
            <Collapsible>
                <CollapsibleItem header='Sunday' icon='toc'>
                    <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Monday' icon='toc'>
                 <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Tuesday' icon='toc'>
                   <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Wednesday' icon='toc'>
                    <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Thursday' icon='toc'>
                    <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Friday' icon='toc'>
                    <SchedulerContent/>
                </CollapsibleItem>

                <CollapsibleItem header='Saturday' icon='toc'>
                    <SchedulerContent/>
                </CollapsibleItem>
            </Collapsible>
        </div>
    )
}

export default scheduler;
