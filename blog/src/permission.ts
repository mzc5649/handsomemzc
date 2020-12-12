import router from "@/router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async(to, from, next) => {
    nProgress.start()
    document.title=getPageTitle(to.meta.title)
    next()
})
router.afterEach(() => {
    // finish progress bar
    nProgress.done()
})
