const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium fee. It costs 0.25 LINK
const GAS_PRICE_LINK = 1e9 // link per gas. calculated value based on the gas price of the chain

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const networkName = network.name
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(networkName)) {
        log("Local network detected! Deploying mocks...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args,
            log: true,
        })
        log("Mocks deployed!")
        log("--------------------------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
