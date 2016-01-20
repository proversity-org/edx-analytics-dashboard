from requests.exceptions import ConnectTimeout

from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from courses.views import CourseTemplateWithNavView
from learner_analytics_api.v0.utils import LearnerAPIClient


class LearnersView(CourseTemplateWithNavView):
    template_name = 'courses/learners.html'
    active_primary_nav_item = 'learners'
    page_title = _('Learners')
    page_name = 'learners'


    def get_context_data(self, **kwargs):
        context = super(LearnersView, self).get_context_data(**kwargs)
        context['page_data'] = self.get_page_data(context)
        context['learner_list_url'] = reverse('learner_analytics_api:v0:LearnerList')
        # Grab the first page of learners
        client = LearnerAPIClient()
        try:
            context['learner_list_json'] = client.learners.get(course_id=self.course_id).json()
        except ConnectTimeout:
            context['learner_list_json'] = None
        return context
