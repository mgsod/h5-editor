import { Alert } from '@/components/Editor/Action/alert';
import { Toast as VToast } from 'vant';

VToast.setDefaultOptions({
  duration: 2000,
});
export class Toast extends Alert {
  handle() {
    VToast(this.content);
  }
}
