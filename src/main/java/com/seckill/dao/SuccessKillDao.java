package com.seckill.dao;

import com.seckill.entity.SuccessKilled;

public interface SuccessKillDao {

    /**
     * insert purchase details，enable filtering duplicate object
     * @param seckillId
     * @param userPhone
     * @return the number of rows effected
     */
    int insertSuccessKilled(long seckillId, long userPhone);

    /**
     * query SuccessKilled by id, and contains Seckill entity for product
     * @param seckillId
     * @return
     */
    SuccessKilled queryByIdWithSeckill(long seckillId);
}
