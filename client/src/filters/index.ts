import Vue from "vue"
import moment from "moment"

Vue.filter('date', function (value: any, ...args: any) {
    const [format, dash] = args
    const isValid = moment(value).isValid()
    if (!value || !isValid) return dash ? '–' : ''
  
    switch (format) {
      case undefined: {
        return value
      }
      case 'short': {
        return moment(value).format('MM/DD/YYYY')
      }
      case 'shortWithTime': {
        return moment(value).format('MM/DD/YYYY H:m:ss')
      }
      default: {
        return moment(value).format(format)
      }
  
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })

  var filter = function(text: string, length: number, clamp: string){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;

    if (!content) {return null}
      
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);