// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AtlasVerification
 * @dev Simple contract to verify deployer ownership for OP Atlas retro funding
 * Deploy this contract from any wallet you control to prove ownership
 */
contract AtlasVerification {
    address public immutable deployer;
    string public constant verificationMessage = "I verify that my contracts are for Project 0x647deb523381917ea613c4a9e4f35c516402793a0bba4826f59eb6c5efb27a73 and I'm an optimist.";
    bytes32 public constant projectId = 0x647deb523381917ea613c4a9e4f35c516402793a0bba4826f59eb6c5efb27a73;

    // Events for verification
    event VerificationDeployed(address indexed deployer, bytes32 projectId);
    event OwnershipVerified(address indexed deployer);

    constructor() {
        deployer = msg.sender;
        emit VerificationDeployed(msg.sender, projectId);
        emit OwnershipVerified(msg.sender);
    }

    /**
     * @dev Returns the verification message
     */
    function getVerificationMessage() external pure returns (string memory) {
        return verificationMessage;
    }

    /**
     * @dev Returns the project ID
     */
    function getProjectId() external pure returns (bytes32) {
        return projectId;
    }

    /**
     * @dev Verifies that the caller is the deployer
     */
    function verifyOwnership() external view returns (bool) {
        return msg.sender == deployer;
    }

    /**
     * @dev Get deployer info
     */
    function getDeployerInfo() external view returns (address, bytes32, string memory) {
        return (deployer, projectId, verificationMessage);
    }
}