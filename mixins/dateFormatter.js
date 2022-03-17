import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  filters: {
    dayMonthYear (date) {
      return dayjs(date).format('DD MMM YYYY')
    },
    dayMonthYearTime (date) {
      return dayjs(date).format('DD MMM YYYY, h:mm a')
    },
    dayMonthYearTimeFromNow (date) {
      return dayjs(date).fromNow()
    }
  }
}
