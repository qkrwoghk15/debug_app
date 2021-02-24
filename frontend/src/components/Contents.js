import React from "react";
import TabPanel from "./TabPanel"

class Contents extends React.Component {
    render(){
        return (
            <div style={{height:'100%', marginTop:'140px', padding:'10px'}}>            
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={0}>
                </TabPanel>
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={1}>
                </TabPanel>
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={2}>
                </TabPanel>
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={3}>
                </TabPanel>
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={4}>
                </TabPanel>
                <TabPanel value={this.props.value} fileName={this.props.fileName} cars={this.props.cars} isLoading={this.props.isLoading} index={5}>
                </TabPanel>
            </div>
        );
    }
}

export default Contents;