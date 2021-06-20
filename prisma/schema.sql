CREATE TABLE GroupChatMessage (
    id BIGINT NOT NULL AUTO_INCREMENT,
    sendTimestamp  BIGINT,
    groupName: TEXT,
    groupId: BIGINT,
    permission: VARCHAR(255),
    memberName: VARCHAR(255),
    memberId: BIGINT
    PRIMARY KEY (id)
);