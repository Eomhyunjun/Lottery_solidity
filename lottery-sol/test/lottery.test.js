const Lottery = artifacts.require('Lottery');

contract('Lottery', (deployer, uer1, uer2) => {
    let lottery;
    beforeEach(async () => {
        console.log('Before each');
        lottery = await Lottery.new();

    });

    it('Basic test', async () => {
        console.log('Basic test');
        let owner = await lottery.owner();
        let value = await lottery.getSomeValue();
        
        console.log('Owner:', owner);
        console.log('Value:', value);
        assert.equal(value, 5);
    })


    // 특정 케이스만 테스트하려면 only를 사용한다.
    it.only ('getPot should return current pot', async () => {
        let pot = await lottery.getPot();
        
        console.log('Pot:', pot);
        assert.equal(pot, 0);  
    })

});