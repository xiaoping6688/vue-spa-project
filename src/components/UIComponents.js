
import Vue from 'vue'

// 使用element组件库(完整引入)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 按需引入
// import {
//   Row,
//   Col,
//   Icon,
//   Button,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   CheckboxGroup,
//   Input,
//   Select,
//   Option,
//   TimePicker,
//   DatePicker,
//   Form,
//   FormItem,
//   Table,
//   TableColumn,
//   Progress,
//   Pagination,
//   Alert,
//   Loading,
//   Message,
//   MessageBox,
//   Notification,
//   Menu,
//   Submenu,
//   MenuItem,
//   Breadcrumb,
//   BreadcrumbItem,
//   Dialog
// } from 'element-ui'

// const components = [
//   Row,
//   Col,
//   Icon,
//   Button,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   CheckboxGroup,
//   Input,
//   Select,
//   Option,
//   TimePicker,
//   DatePicker,
//   Form,
//   FormItem,
//   Table,
//   TableColumn,
//   Progress,
//   Pagination,
//   Alert,
//   Loading,
//   Message,
//   MessageBox,
//   Notification,
//   Menu,
//   Submenu,
//   MenuItem,
//   Breadcrumb,
//   BreadcrumbItem,
//   Dialog
// ]

// components.forEach((item) => {
//   Vue.component(item.name, item)
// })

// 解决组件自动弹出问题
// Vue.prototype.$message = Message
// Vue.prototype.$notify = Notification
