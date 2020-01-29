const {format} = require('timeago.js');
const helpers = {
  timestamp(timestamp:any){
    return format(timestamp);
  },
  timeago(timestamp:any){
    return format(timestamp);
  }
}
export default helpers;
