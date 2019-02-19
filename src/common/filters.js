
import moment from 'moment';
moment.locale('zh_cn')

export const normalizeDate = function(date) {
  if (!date) return '-';
  return moment(date).format('YYYY-MM-DD')
}