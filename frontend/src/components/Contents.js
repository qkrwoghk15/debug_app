import React from "react";
import TabPanel from "./TabPanel"

class Contents extends React.Component {
    render(){
        return (
            <div style={{marginTop:'140px', padding:'10px'}}>            
                <TabPanel value={this.props.value} index={0}>
                    {/* Item One */}
                </TabPanel>
                <TabPanel value={this.props.value} index={1}>
                    {/* Item Two */}
                </TabPanel>
                <TabPanel value={this.props.value} index={2}>
                    {/* Item Three */}
                </TabPanel>
                <TabPanel value={this.props.value} index={3}>
                    {/* Item Three */}
                </TabPanel>
                <TabPanel value={this.props.value} index={4}>
                    {/* Item Three */}
                </TabPanel>
                <TabPanel value={this.props.value} index={5}>
                    {/* Item Three */}
                </TabPanel>
            </div>
        );
    }
}

export default Contents;