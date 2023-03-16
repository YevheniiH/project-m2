<?php

namespace Learning\FirstUnit\ViewModel;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Customer\Block\Account\Customer;

class myViewModel implements ArgumentInterface
{
    /**
     * @var Customer
     */
    private $customer;

    /**
     * @param Customer $customer
     */
    public function __construct(Customer $customer)
    {
        $this->customer = $customer;

    }

    public function getSomething()
    {
        return "-Test-";
    }

    /**
     * @return bool
     */
    public function isUserLoggedIn()
    {
        return $this->customer->customerLoggedIn();
    }

    public function getArrayJson($jsonSting)
    {
        return json_decode($jsonSting, true);
    }
}
