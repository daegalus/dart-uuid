#!/bin/bash

# Set Chrome options to match the GitHub workflow configuration
export DART_TEST_CHROME_OPTIONS="--no-sandbox --disable-gpu --headless --disable-dev-shm-usage"

# Run the tests with Chrome platform
echo "Running Chrome tests with DART_TEST_CHROME_OPTIONS: $DART_TEST_CHROME_OPTIONS"
dart test -p chrome

# Exit with the test command's exit code
exit $? 