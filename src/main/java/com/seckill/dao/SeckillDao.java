package com.seckill.dao;

import com.seckill.entity.Seckill;

import java.util.Date;
import java.util.List;

public interface SeckillDao {

    /**
     * reduce product number in the data table
     * @param seckillId
     * @param killTime
     * @return if effect rows > 1, represent rows was update
     */
    int reduceNumber(long seckillId, Date killTime);

    /**
     * query seckill product by id
     * @param seckillId
     * @return
     */
    Seckill queryById(long seckillId);

    /**
     * query product list by offset and limit
     * @param offset
     * @param limit
     * @return
     */
    List<Seckill> queryAll(int offset, int limit);
}
