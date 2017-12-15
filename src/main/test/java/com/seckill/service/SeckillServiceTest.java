package com.seckill.service;

import com.seckill.dto.Exposer;
import com.seckill.dto.SeckillExecution;
import com.seckill.entity.Seckill;
import com.seckill.exception.RepeatKillException;
import com.seckill.exception.SeckillCloseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
                    "classpath:spring/spring-service.xml"})
public class SeckillServiceTest {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SeckillService seckillService;

    @Test
    public void getSeckillAll() throws Exception {
        List<Seckill> seckills = seckillService.getSeckillAll();
        logger.info("list={}", seckills);
    }

    @Test
    public void getSeckill() throws Exception {
        long id = 1000;
        Seckill seckill = seckillService.getSeckill(id);
        logger.info("seckill={}", seckill);
    }

    @Test
    public void testSeckill() throws Exception {
        long id = 1001;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        if (exposer.getExposed()) {
            logger.info("exposer={}", exposer);
            long phone = 12344234L;
            //  pass:  Exposer{exposed=true, md5='f09da33a51fd20970cee586e6f2a2192', seckillId=1000, now=0, start=0, end=0}
            try {
                SeckillExecution seckillExecution = seckillService.executeSeckill(id, phone, exposer.getMd5());
                logger.info("seckillExecution={}", seckillExecution);
            }
            catch (RepeatKillException e) {
                logger.error(e.getMessage());
            }
            catch (SeckillCloseException e) {
                logger.error(e.getMessage());
            }
        }
        else {
            logger.warn("exposer={}", exposer);
        }
    }

}