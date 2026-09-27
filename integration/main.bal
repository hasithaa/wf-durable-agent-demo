import ballerina/log;
import ballerinax/h2.driver as _;
import ballerinax/postgresql.driver as _;
import commons/attachment.server as _;
import commons/chat.server as _;
import commons/notification.server as _;

// One process runs the three commons services, the durable maintenance agent and the app API.
function init() returns error? {
    check initStore();
    check resumePendingTurns();
    log:printInfo(string `Maintenance app API on port ${appPort}`);
}
