// @flow

type Images = {
  course: {[name: string]: any},
  tabbar: {[name: string]: any},
  assignments: {[name: string]: any},
  [name: string]: any,
}

const images = {
  course: {
    announcements: require('./course/Announcements.png'),
    assignments: require('./course/Assignments.png'),
    discussions: require('./course/Discussions.png'),
    pages: require('./course/Pages.png'),
    people: require('./course/People.png'),
    quiz: require('./course/Quiz.png'),
    syllabus: require('./course/Syllabus.png'),
    files: require('./course/Files.png'),
    settings: require('./course/Settings.png'),
  },
  tabbar: {
    courses: require('./tabbar/courses.png'),
    inbox: require('./tabbar/inbox.png'),
    profile: require('./tabbar/profile.png'),
    staging: require('./tabbar/link.png'),
    stagingFilled: require('./tabbar/link-solid.png'),
  },
  assignments: {
    published: require('./assignments/Published.png'),
    unpublished: require('./assignments/Unpublished.png'),
    calendar: require('./assignments/Calendar.png'),
  },
  canvasLogo: require('./canvas-logo.png'),
  feedback: require('./feedback.png'),
  kabob: require('./kabob.png'),
  backIcon: require('./Back-icon.png'),
  check: require('./check-white.png'),
  starFilled: require('./star-filled.png'),
  starLined: require('./star-lined.png'),
  add: require('./Add.png'),
  x: require('./x-icon.png'),
}

export default (images: Images)
