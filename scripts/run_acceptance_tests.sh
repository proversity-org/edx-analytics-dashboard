#!/bin/sh

# Note that this assumes that Insights is running at http://127.0.0.1:8110

ENABLE_LEARNER_ANALYTICS=True DASHBOARD_SERVER_URL='http://127.0.0.1:8110' LMS_SSL_ENABLED=False COURSE_API_URL="http://localhost:8000/api/course_structure/v0/" COURSE_API_KEY=None ENABLE_AUTH_TESTS=True LMS_HOSTNAME="127.0.0.1:8000" LMS_USERNAME="staff@example.com" LMS_PASSWORD="edx" ENABLE_AUTO_AUTH=False API_SERVER_URL="http://127.0.0.1:8100/api/v0" API_AUTH_TOKEN="changeme" ENABLE_ENROLLMENT_MODES=True ENABLE_FORUM_POSTS=False nosetests -v acceptance_tests/test_course_learners.py -e NUM_PROCESSES=1 --exclude-dir=acceptance_tests/course_validation
