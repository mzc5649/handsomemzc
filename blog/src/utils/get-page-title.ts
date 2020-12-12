import settings from '@/settings'
let setting=new settings()
const title = setting.title()
export default function getPageTitle(pageTitle:string) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
